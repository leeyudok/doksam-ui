import { Badge } from "@/components/ui/badge"
import { PatternSample } from "@/components/showcase/pattern-sample"
import { FILE_UPLOAD_SAMPLES } from "@/components/patterns/file-upload-samples"

export default function FileUploadPatternsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Patterns
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight">파일 업로드 패턴</h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          드래그앤드롭 드롭존과 업로드 진행률·상태 뱃지·파일 삭제를 조합한 파일 업로드 UI
          패턴입니다.
        </p>
      </section>

      {FILE_UPLOAD_SAMPLES.map((sample) => (
        <PatternSample key={sample.num} {...sample} />
      ))}
    </div>
  )
}
