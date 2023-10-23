import { useEffect, useState } from "react";
import axios from 'axios';

export const useAxios = (configParams, executeAtMount = true) => {
  axios.defaults.baseURL = 'https://us-central1-test-b7665.cloudfunctions.net/api';
  const [res, setRes] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(executeAtMount ? true : false);

  useEffect(() => {
    if (executeAtMount) {
      fetchDataUsingAxios();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUsingAxios = async(configParamsTrigger = null) => {
      setLoading(true);
      await axios.request(configParamsTrigger ? configParamsTrigger : configParams)
      .then(res => setRes(res))
      .catch(err => setErr(err))
      .finally(() => setLoading(false))
  }

  const triggerFetch = (configParamsTrigger) => {
    setLoading(true);
    fetchDataUsingAxios(configParamsTrigger);
  }

  const refreshCall = () => {
    fetchDataUsingAxios();
  }

  const reInitState = () => {
    setRes('');
    setErr('');
    setLoading(false);
  }
  
  return { res, data: res?.data, err, loading, triggerFetch, reInitState, refreshCall };
}