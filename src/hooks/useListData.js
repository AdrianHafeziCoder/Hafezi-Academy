import { useEffect, useState } from "react";
import { normalizeList, errorText } from "../lib/apiData";

export function useListData(fetcher, params, refreshKey) {
  const [state, setState] = useState({
    rows: [],
    total: 0,
    loading: true,
    error: "",
  });
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false; // If the component was closed, ignore the old response
    setState((old) => ({ ...old, loading: true, error: "" }));
    fetcher(params)
      .then(
        (res) =>
          !cancelled &&
          setState({ ...normalizeList(res.data), loading: false, error: "" }),
      )
      .catch(
        (err) =>
          !cancelled &&
          setState({
            rows: [],
            total: 0,
            loading: false,
            error: errorText(err),
          }),
      );
    return () => {
      cancelled = true;
    };
  }, [paramsKey, refreshKey]);

  return state;
}
