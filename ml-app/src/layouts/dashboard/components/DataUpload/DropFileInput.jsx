import React, { useRef, useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import { useFile } from 'layouts/Filecontext';
import './drop-file-input.css';
import axios from 'axios';
import { ImageConfig } from 'config/ImageConfig';
import uploadImg from 'assets/cloud-upload-regular-240.png';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';
//import uploadBtnImg from 'assets/upload-button.png'; // Add the path to your upload button image

const DropFileInput = (props) => {
    const wrapperRef = useRef(null);
    const { setFile } = useFile();
    const {file} = useFile();
    const [fileName, setFileName] = useState('');
    const [fileList, setFileList] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/get-csrf-token/');
                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setFile(newFile);
            setFileName(newFile.name); // Set the fileName
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
            headers: {
         
              'Content-Disposition': `attachment; filename="${fileName}"`,
              'X-CSRFToken': csrfToken,
            },
          });
            const result = response.data;
            console.log(result);
  
            // After uploading, fetch the content for visualization
            const contentResponse = await axios.get(`http://127.0.0.1:8000/visualize-file/${file.name}`);
            const contentResult = contentResponse.data;
            console.log(contentResult);
  
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
  

    const fileRemove = (file) => {
        const updatedList = fileList.filter((item) => item !== file);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" accept=".csv, .xlsx, .xls" value="" onChange={onFileDrop} />
            </div>
            <MDBox display="flex" justifyContent="flex-end">
                <MDButton  onClick={handleUpload} color ="info"> Upload</MDButton>
            </MDBox>
            <br></br>
            {fileList.length > 0 && (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Ready to upload</p>
                    {fileList.map((item, index) => (
                        <div key={index} className="drop-file-preview__item">
                            <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                            <div className="drop-file-preview__item__info">
                                <p>{item.name}</p>
                                <p>{item.size}B</p>
                            </div>
                            <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>
                                x
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
};

export default DropFileInput;
