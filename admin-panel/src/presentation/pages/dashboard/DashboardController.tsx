import * as DummyRepository from "../../../data/dummy/DummyRepository";
import { useDashboardStore } from "./DashboardStore";

export default function DashboardController({
  dummyRepository,
}: {
  dummyRepository: typeof DummyRepository;
}) {
  const store = useDashboardStore.getState();

  async function loadMessage() {
    store.setLoading(true);
    store.setError(null);
    try {
      const message = await dummyRepository.getDummyMessage();
      store.setMessage(message);
    } catch (error) {
      store.setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      store.setLoading(false);
    }
  }

  function getState() {
    return {
      message: store.message,
      isLoading: store.isLoading,
      error: store.error,
    };
  }

  const state = getState();
  const actions = { loadMessage };

  return {
    actions,
    state,
  };
}
