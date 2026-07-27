import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 컨테이너 배포 — Containerfile 런타임 스테이지가 .next/standalone 산출물만 복사해
  // 이미지를 최소화한다.
  output: "standalone",
};

export default nextConfig;
