import { NavigateFunction } from "react-router-dom";

export const goBack = (navigate: NavigateFunction) => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };