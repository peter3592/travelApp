import { useEffect } from "react";
import { useUIContext } from "../../store/context";

export default function useShowErrorModal(error, isLoading, message) {
  const { setModal } = useUIContext();

  useEffect(() => {
    if (!isLoading && error) setModal({ type: "error", message });
  }, [error, isLoading]);
}
