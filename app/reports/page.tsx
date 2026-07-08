"use client";

import { useEffect, useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createLocalWeeklyReport,
  getCurrentUser,
  getLocalReports,
  getLocalSessions
} from "@/lib/storage";
import type { WeeklyReport } from "@/lib/types";
import { formatDuration, getMonday, toDateInputValue } from "@/lib/utils";

export default function ReportsPage() {
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setReports(getLocalReports());
    void loadWeeklyReport();
  }, []);

  async function loadWeeklyReport() {
    const user = getCurrentUser();
    const weekStart = toDateInputValue(getMonday());
    const response = await fetch(
      `/api/reports/weekly?userId=${encodeURIComponent(user.id)}&weekStart=${weekStart}`
    ).catch(() => null);

    if (!response?.ok) return;
    const result = await response.json();
    if (result.report) {
      setReports([result.report]);
    }
  }

  async function generateReport() {
    setLoading(true);
    setMessage("");
    const user = getCurrentUser();
    const weekStart = toDateInputValue(getMonday());

    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, weekStart })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to generate AI report");
      }

      const reportResponse = await fetch(
        `/api/reports/weekly?userId=${encodeURIComponent(user.id)}&weekStart=${weekStart}`
      );
      const reportResult = await reportResponse.json();

      if (reportResult.report) {
        setReports([reportResult.report]);
        setMessage(
          result.source === "openai"
            ? "OpenAI report generated from Supabase training data."
            : "Fallback report generated because OPENAI_API_KEY is not configured."
        );
        return;
      }

      throw new Error("AI report was generated but could not be loaded");
    } catch (error) {
      const report = createLocalWeeklyReport(getLocalSessions());
      setReports(
        getLocalReports()
          .filter((item) => item.weekStartDate !== report.weekStartDate)
          .concat(report)
      );
      setMessage(
        error instanceof Error
          ? `${error.message}. Showing local demo report instead.`
          : "Showing local demo report instead."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge>Pro preview</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal">
              AI Weekly Focus Training Report
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Generate a weekly recap from Supabase training data. With OPENAI_API_KEY configured,
              the backend calls OpenAI and stores the report in Postgres.
            </p>
            <h2 className="mt-6 text-2xl font-semibold tracking-normal">
              AI productivity insights from focus training data
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Weekly reports summarize sessions, accuracy, time, and practical next steps without
              medical claims.
            </p>
          </div>
          <Button onClick={generateReport} disabled={loading}>
            <Sparkles className="h-4 w-4" aria-hidden />
            {loading ? "Generating..." : "Generate AI report"}
          </Button>
        </div>
        {message ? (
          <div className="rounded-md border bg-background/80 p-4 text-sm text-muted-foreground">
            {message}
          </div>
        ) : null}

        {reports.length === 0 ? (
          <Card className="bg-background/92 backdrop-blur">
            <CardContent className="flex flex-col items-center p-10 text-center">
              <FileText className="h-10 w-10 text-primary" aria-hidden />
              <p className="mt-4 font-medium">No reports yet</p>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Complete a few sessions, then generate this week&apos;s recap.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {[...reports].reverse().map((report) => (
              <Card key={report.weekStartDate} className="bg-background/92 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle>
                      Week of {new Date(report.weekStartDate).toLocaleDateString()}
                    </CardTitle>
                    <Badge>{report.totalSessions} sessions</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    <Metric label="Time" value={formatDuration(report.totalDurationSeconds)} />
                    <Metric
                      label="Accuracy"
                      value={`${(report.averageAccuracy * 100).toFixed(1)}%`}
                    />
                    <Metric label="Window" value={`${report.weekStartDate} to ${report.weekEndDate}`} />
                  </div>
                  <p className="whitespace-pre-line leading-7 text-muted-foreground">
                    {report.reportContent}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-background/70 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
