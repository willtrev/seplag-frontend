/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";

export default function ErrorView() {
  const error: any = useRouteError();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      {error.stack.split("\n").map((item: any) => ({ item }))}
    </div>
  );
}
