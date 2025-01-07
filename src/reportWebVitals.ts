import { onCLS, onFID, onFCP, onLCP, onTTFB } from "web-vitals";

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry); // CLS 메트릭
    onFID(onPerfEntry); // FID 메트릭
    onFCP(onPerfEntry); // FCP 메트릭
    onLCP(onPerfEntry); // LCP 메트릭
    onTTFB(onPerfEntry); // TTFB 메트릭
  }
};

export default reportWebVitals;
