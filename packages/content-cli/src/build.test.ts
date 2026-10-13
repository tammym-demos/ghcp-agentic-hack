import { describe, expect, it } from "vitest";
import { workshopSchema, type ContentCatalog } from "@ghcp/content-schema";
import { deckBase, portalDetailRoutes, siteRoutes } from "./build.js";

describe("deckBase", () => {
  it("includes the GitHub Pages project path", () => {
    expect(deckBase("ghcp-dev-hack", "foundations", "/ghcp-video-content/")).toBe(
      "/ghcp-video-content/workshops/ghcp-dev-hack/foundations/"
    );
  });

  describe("portalDetailRoutes", () => {
    it("includes workshop, delivery variant, and mission pages", () => {
      const catalog = {
        workshops: [{
          workshop: {
            data: {
              id: "workshop",
              deliveryVariants: [{ id: "one-day" }, { id: "two-day" }]
            }
          },
          modules: [{
            data: {
              id: "foundations",
              missions: ["content/missions/foundations/first-mission.md"]
            }
          }],
          missions: [{
            filePath: "C:/repo/workshop/content/missions/foundations/first-mission.md",
            data: { id: "first-mission" }
          }]
        }]
      } as Parameters<typeof portalDetailRoutes>[0];

      expect(portalDetailRoutes(catalog)).toEqual([
        "workshops/workshop/",
        "workshops/workshop/variants/one-day/",
        "workshops/workshop/variants/two-day/",
        "workshops/workshop/foundations/missions/first-mission/"
      ]);
    });
  });

  it("normalizes a base without a trailing slash", () => {
    expect(deckBase("workshop", "module", "/repository")).toBe("/repository/workshops/workshop/module/");
  });

  it("lists portal and module routes for deployment verification", () => {
    const catalog = {
      workshops: [{
        workshop: {
          data: {
            id: "workshop",
            deliveryVariants: [{ id: "one-day" }]
          }
        },
        modules: [{
          data: {
            id: "foundations",
            missions: ["content/missions/foundations/first-mission.md"]
          }
        }],
        missions: [{
          filePath: "C:/repo/workshop/content/missions/foundations/first-mission.md",
          data: { id: "first-mission" }
        }]
      }]
    } as Parameters<typeof siteRoutes>[0];

    expect(siteRoutes(catalog)).toEqual([
      "",
      "workshops/workshop/",
      "workshops/workshop/variants/one-day/",
      "workshops/workshop/foundations/missions/first-mission/",
      "workshops/workshop/foundations/"
    ]);
  });

  it("includes standalone readiness guide routes for deployment verification", () => {
    const catalog: ContentCatalog = {
      workshops: [{
        root: "workshops/workshop",
        workshop: {
          filePath: "workshops/workshop/workshop.md",
          body: "",
          data: workshopSchema.parse({
            schemaVersion: 1,
            kind: "workshop",
            id: "workshop",
            title: "Workshop",
            description: "Customer workshop",
            format: "two-day",
            duration: "Two days",
            level: "mixed",
            audience: ["Developers"],
            modules: ["intro"],
            lastReviewed: "2026-10-13",
            readinessGuide: { title: "Readiness", path: "artifacts/customer/readiness.html" }
          })
        },
        modules: [],
        missions: [],
        labs: [],
        storyboards: [],
        scenes: [],
        characters: [],
        locations: [],
        complexTopicPlans: []
      }]
    };
    expect(siteRoutes(catalog)).toEqual([
      "",
      "workshops/workshop/",
      "workshops/workshop/resources/readiness/"
    ]);
    expect(portalDetailRoutes(catalog)).not.toContain("workshops/workshop/resources/readiness/");
  });
});
