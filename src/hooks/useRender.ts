import React, { useEffect, useState } from "react";

export default function useRender() {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  return render;
}
