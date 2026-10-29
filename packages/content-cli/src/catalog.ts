import fsExtra from "fs-extra";
import { loadCatalog, type ContentCatalog } from "@ghcp/content-schema";
import { portalCatalogPath, repositoryRoot } from "./paths.js";

const { writeJson } = fsExtra;

function elapsedMinutes(start: string, end: string): number {
  const toMinutes = (value: string): number => {
    const [hours, minutes] = value.split(":").map(Number);
    return (hours ?? 0) * 60 + (minutes ?? 0);
  };
  return toMinutes(end) - toMinutes(start);
}

export function resolveWorkshopEnvironment(value = process.env.WORKSHOP_ENVIRONMENT): "test" | "production" {
  return value === "production" ? "production" : "test";
}

export function readinessGuideRoute(workshopId: string): string {
  return `workshops/${workshopId}/resources/readiness/`;
}

export function createPortalCatalog(catalog: ContentCatalog, environment = resolveWorkshopEnvironment()) {
  return {
    environment,
    workshops: catalog.workshops.map((entry) => {
      const workshopId = entry.workshop.data.id;
      const modules = entry.workshop.data.modules.map((moduleId) => {
        const module = entry.modules.find(({ data }) => data.id === moduleId);
        if (!module) throw new Error(`Missing module ${moduleId}`);
        return {
          id: module.data.id,
          title: module.data.title,
          description: module.data.description,
          duration: module.data.duration,
          totalMinutes: module.data.totalMinutes,
          status: module.data.status,
          route: `workshops/${workshopId}/${module.data.id}/`
          ,
          missions: module.data.missions.map((missionPath) => {
            const mission = entry.missions.find(({ filePath }) =>
              filePath.replaceAll("\\", "/").endsWith(missionPath)
            );
            if (!mission) throw new Error(`Missing mission ${missionPath}`);
            return {
              id: mission.data.id,
              title: mission.data.title,
              durationMinutes: mission.data.durationMinutes,
              debriefMinutes: mission.data.debriefMinutes,
              route: `workshops/${workshopId}/${module.data.id}/missions/${mission.data.id}/`,
              objectiveRefs: mission.data.objectiveRefs,
              prerequisites: mission.data.prerequisites,
              startingState: mission.data.startingState,
              goal: mission.data.goal,
              task: mission.data.task,
              constraints: mission.data.constraints,
              evidence: mission.data.evidence,
              safetyCheckpoints: mission.data.safetyCheckpoints,
              corePath: mission.data.corePath,
              stretchPath: mission.data.stretchPath,
              debrief: mission.data.debrief,
              validation: mission.data.validation,
              casePacket: mission.data.casePacket,
              starterFile: mission.data.starterFile,
              harnesses: mission.data.harnesses,
              coreClues: mission.data.coreClues,
              bonusClues: mission.data.bonusClues,
              completionPoints: mission.data.completionPoints,
              bonusPointCap: mission.data.bonusPointCap,
              carryForward: mission.data.carryForward,
              leaderboard: mission.data.leaderboard
            };
          })
        };
      });
      const workshopArchived = Boolean(
        entry.workshop.data.archived ||
        (entry.workshop.data.archiveOnProduction && environment === "production")
      );
      const deliveryVariants = (entry.workshop.data.deliveryVariants ?? []).map((variant) => {
        const agenda = variant.days.flatMap((day) => day.agenda);
        const variantArchived = Boolean(
          workshopArchived ||
          variant.archived ||
          (variant.archiveOnProduction && environment === "production")
        );
        return {
          id: variant.id,
          title: variant.title,
          description: variant.description,
          route: `workshops/${workshopId}/variants/${variant.id}/`,
          ...(variantArchived ? { archived: true } : {}),
          ...(variant.archiveOnProduction ? { archiveOnProduction: true } : {}),
          totalMinutes: agenda.reduce((total, block) => total + elapsedMinutes(block.start, block.end), 0),
          days: variant.days.map((day) => ({
            id: day.id,
            title: day.title,
            start: day.start,
            end: day.end,
            totalMinutes: elapsedMinutes(day.start, day.end),
            agenda: day.agenda.map((block) => ({
              ...block,
              minutes: elapsedMinutes(block.start, block.end),
              moduleRoute: block.module ? `workshops/${workshopId}/${block.module}/` : undefined
            }))
          })),
          modulePhases: modules.map((module) => ({
            module: module.id,
            title: module.title,
            contentMinutes: agenda
              .filter((block) => block.module === module.id && block.type === "module-content")
              .reduce((total, block) => total + elapsedMinutes(block.start, block.end), 0),
            missionMinutes: agenda
              .filter((block) => block.module === module.id && block.type === "mission")
              .reduce((total, block) => total + elapsedMinutes(block.start, block.end), 0)
          }))
        };
      });
      const workshopLeaderboard = entry.workshop.data.leaderboard;
      const leaderboard = workshopLeaderboard
        ? {
            optional: workshopLeaderboard.optional,
            aliasOnly: workshopLeaderboard.aliasOnly,
            eventId: workshopLeaderboard.eventId,
            environment,
            repository: workshopLeaderboard.environments[environment].repository,
            submissionUrl: workshopLeaderboard.environments[environment].submissionUrl,
            standingsUrl: workshopLeaderboard.environments[environment].standingsUrl,
            submissionMode: workshopLeaderboard.environments[environment].submissionMode
          }
        : undefined;
      return {
        id: workshopId,
        title: entry.workshop.data.title,
        description: entry.workshop.data.description,
        duration: entry.workshop.data.duration,
        totalMinutes: entry.workshop.data.totalMinutes,
        format: entry.workshop.data.format,
        level: entry.workshop.data.level,
        tags: entry.workshop.data.tags,
        prerequisites: entry.workshop.data.prerequisites,
        externalLinks: entry.workshop.data.externalLinks,
        route: `workshops/${workshopId}/`,
        ...(workshopArchived ? { archived: true } : {}),
        ...(entry.workshop.data.archiveOnProduction ? { archiveOnProduction: true } : {}),
        readinessGuide: entry.workshop.data.readinessGuide
          ? {
            title: entry.workshop.data.readinessGuide.title,
            route: readinessGuideRoute(workshopId),
            deliveryVariant: entry.workshop.data.readinessGuide.deliveryVariant
          }
          : undefined,
        leaderboard,
        defaultDeliveryVariant: entry.workshop.data.defaultDeliveryVariant,
        deliveryVariants,
        modules
      };
    })
  };
}

export async function generatePortalCatalog(catalogOverride?: ContentCatalog): Promise<void> {
  const catalog = catalogOverride ?? (await loadCatalog(repositoryRoot));
  await writeJson(
    portalCatalogPath,
    createPortalCatalog(catalog),
    { spaces: 2 }
  );
}
