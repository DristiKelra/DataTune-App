import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

export const DataViz = ({ onDrop }) => {
  const [fileData, setFileData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [chartType, setChartType] = useState('bar');

  

  const handleDrop = (acceptedFiles) => {
    // Do something with the accepted files (e.g., store them in state)
    setFileData(acceptedFiles);
    onDrop(acceptedFiles); // Pass the dropped files to the parent component if needed
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.csv',
    onDrop: handleDrop,
  });
  // const handleDrop = (acceptedFiles) => {
  //   // Do something with the accepted files (e.g., store them in state)
  //   setFileData(acceptedFiles);
  //   onDrop(acceptedFiles); // Pass the dropped files to the parent component if needed
  
  //   // Parse the CSV file
  //   acceptedFiles.forEach((file) => {
  //     Papa.parse(file, {
  //       complete: (result) => {
  //         setFileData(result.data);
  //       },
  //       header: true, // Assuming the first row is the header
  //     });
  //   });
  // };

  const dropzoneProps = useDropzone({
    accept: '.csv',
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
      setFileData([]); // Clear previous data when a new file is dropped
    },
  });

  useEffect(() => {
    renderChart();
  }, [fileData, selectedColumns, chartType]);

  const renderChart = () => {
    if (fileData.length === 0 || selectedColumns.length < 2) {
      return null;
    }
    const labels = Object.keys(fileData[0]);
    const dataValues = labels.map((label) => fileData.map((data) => data[label]));

    const data = {
      labels: fileData.map((data) => data[selectedColumns[0]]),
      datasets: selectedColumns.slice(1).map((column, index) => ({
        label: column,
        data: fileData.map((data) => Number(data[column])),
        backgroundColor: `rgba(${(index + 1) * 50}, 132, 190, 0.6)`,
        borderColor: `rgba(${(index + 1) * 50}, 132, 190, 1)`,
        borderWidth: 1,
      })),
    };

    const chartOptions = {
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true },
      },
    };

    let chartComponent;
    switch (chartType) {
      case 'bar':
        chartComponent = <Bar data={data} options={chartOptions} />;
        break;
      case 'line':
        chartComponent = <Line data={data} options={chartOptions} />;
        break;
      case 'doughnut':
        chartComponent = <Doughnut data={data} />;
        break;
      default:
        chartComponent = null;
    }
    return chartComponent;
  };

  return (
    <div>
       <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a CSV file here, or click to select one</p>
      </div>

      {fileData.length > 0 && (
        <div>
          <div>
            <label>Chart Type:</label>
            <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="doughnut">Doughnut Chart</option>
            </select>
          </div>

          <div>
            <label>Columns:</label>
            {Object.keys(fileData[0]).map((column) => (
              <label key={column} style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() =>
                    setSelectedColumns((prevColumns) =>
                      prevColumns.includes(column)
                        ? prevColumns.filter((col) => col !== column)
                        : [...prevColumns, column]
                    )
                  }
            /* {selectedColumns.map((column) => (
              <label key={column} style={{ marginRight: '10px' }}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() =>
                    setSelectedColumns((prevColumns) =>
                      prevColumns.includes(column)
                        ? prevColumns.filter((col) => col !== column)
                        : [...prevColumns, column]
                    )
                  } */
                />
                {column}
              </label>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>{renderChart()}</div>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default DataViz;
