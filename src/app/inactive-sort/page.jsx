'use client'

import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

// Utils
import { sortSheet } from '@/utils/sheetUtils';

// Components
import SheetViewer from '@/components/SheetViewer';
import Navbar from '@/components/Navbar';

// Icons
import { FiDownload } from "react-icons/fi";
import { FiUpload } from "react-icons/fi";

function InactiveSort() {
    const { data: session, status } = useSession()

    // onchange states
    const [excelFile, setExcelFile] = useState(null);
    const [typeError, setTypeError] = useState(null);
    const [fileData, setFileData] = useState(null);

    // submit state
    const [excelData, setExcelData] = useState(null);

    if (!session) {
        redirect("/");
        return (<></>);
    }

    // Clear file
    const clearExcelFile = () => {
        setExcelFile(null);
        setFileData(null);
        setExcelData(null);
        setTypeError(null);

        console.log("Cleared Sheet");
    }

    // onchange event
    const handleFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileTypes.includes(selectedFile.type)) {
                setTypeError(null);
                setFileData(selectedFile);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                }
            }
            else {
                setTypeError('Please select only excel or csv file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('Please select your file');
        }
    }

    // submit event
    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, {
                defval: "",
                raw: false
            });
            setExcelData(data);
        }
    }

    return (
        <>
            <Navbar />
            <div className="section"></div>
            <h2 className="title p-3 m-2">Find Inactive Clients</h2>
            {/* form */}
            <form className="form-group custom-form" onSubmit={handleFileSubmit}>
                <div className="file is-flex is-justify-content-space-between">
                    <label className="file-label ml-2">
                        <input required onChange={handleFile} className="file-input" type="file" name="resume" />
                        <span className="file-cta m-2">
                            <span className="file-icon">
                                <FiUpload />
                            </span>
                            {fileData ?
                                <span className="m-2 file-label">{fileData.name}</span> :
                                <span className="m-2 file-label">Choose a file…</span>
                            }
                        </span>
                        {fileData &&
                            <button type="submit" className="m-2 button">View</button>
                        }
                    </label>

                    <div>
                        {excelData &&
                            <>
                                <button className="button m-2" onClick={clearExcelFile}>Clear Sheet</button>
                                <span onClick={() => sortSheet(excelData)} className="file-cta m-2">
                                    <span className="file-icon">
                                        <FiDownload />
                                    </span>
                                    <span className="m-2 file-label">Download Sorted</span>
                                </span>
                            </>}
                    </div>
                </div>
                {typeError && (
                    <div className="alert alert-danger" role="alert">{typeError}</div>
                )}
            </form>

            {/* view data */}
            <div>
                <SheetViewer excelData={excelData} />
            </div>
        </>
    );
}

export default InactiveSort;