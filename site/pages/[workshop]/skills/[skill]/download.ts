import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { discoverWorkshopSkills, workshopMeta } from '../../../../data/workshops'

interface DownloadProps {
  content: string
  fileName: string
}

export function getStaticPaths() {
  const workshopsDir: string = __WORKSHOPS_DIR__
  const showDrafts: boolean = __SHOW_DRAFTS__
  const paths: { params: { workshop: string; skill: string }; props: DownloadProps }[] = []

  for (const workshopName of Object.keys(workshopMeta)) {
    const workshopDir = resolve(workshopsDir, workshopName)
    if (!existsSync(workshopDir)) continue
    if (!showDrafts && existsSync(resolve(workshopDir, '.draft'))) continue

    for (const skill of discoverWorkshopSkills(workshopsDir, workshopName)) {
      paths.push({
        params: { workshop: workshopName, skill: skill.slug },
        props: {
          content: readFileSync(skill.sourcePath, 'utf-8'),
          fileName: skill.downloadFileName
        }
      })
    }
  }

  return paths
}

export function GET({ props }: { props: DownloadProps }) {
  return new Response(props.content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': `attachment; filename="${props.fileName}"`
    }
  })
}
