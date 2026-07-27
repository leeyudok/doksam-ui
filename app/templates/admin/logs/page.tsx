import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeading } from "../_components/page-heading"
import { LogViewer } from "@/components/log-viewer"
import { RequestInspector } from "@/components/request-inspector"
import { JsonTree } from "@/components/json-tree"
import { LOG_ENTRIES, REQUEST_ENTRIES, SAMPLE_RESPONSE_JSON } from "../_data/logs-data"

export default function AdminLogsPage() {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-6">
      <PageHeading
        eyebrow="Admin · 로그·관측성"
        title="로그 & 요청 인스펙터"
        description="실시간 애플리케이션 로그, API 요청/응답 상세, 원시 JSON 페이로드를 한 화면에서 조사합니다."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">애플리케이션 로그</CardTitle>
        </CardHeader>
        <CardContent>
          <LogViewer entries={LOG_ENTRIES} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">요청 인스펙터</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestInspector requests={REQUEST_ENTRIES} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">원시 응답 페이로드</CardTitle>
        </CardHeader>
        <CardContent>
          <JsonTree rootLabel="response" data={SAMPLE_RESPONSE_JSON} />
        </CardContent>
      </Card>
    </div>
  )
}
