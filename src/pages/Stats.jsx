import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { apiConfig } from '../api/apiConfig';
import { useAxios } from '../hooks/useAxios';
import Loader from '../components/Loader';
import { useMemo } from 'react';

const Stats = () => {
  const { data: categories = [], loading } = useAxios({
    url: apiConfig.getStatsCategory,
    method: 'get',
  });

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  
  const randomColor = () => {  
    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    const h = randomInt(0, 360);
    const s = randomInt(42, 98);
    const l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };

  const data = useMemo(() => {
    const generateBGColors = (number) => {
      let colors = [];
      for (let i = 0; i < number; i++) {
        colors.push(randomColor(1));
      }
      return colors;
    }

    if (categories.length > 0) {
      return {
        labels: categories.map(item => item.category),
        datasets: [{
          label: 'Numero di prodotti',
          data: categories.map(item => item.numberOfProducts),
          backgroundColor: generateBGColors(categories.length),
        }]
      };
    } else {
      return {}
    }
    
  }, [categories]);

  return (
    <>
      {loading && (
        <Loader></Loader>
      )}
      {categories.length > 0 && (
        <div style={{ width: "100%", height: "calc(100vh - 220px)"}}>
          <PolarArea
            data={data}
            options={{
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      )}
    </>
  )
}

export default Stats