'use client'

function SheetViewer(props) {
    return (
        <>
            <div className="viewer m-4">
                {props.excelData ? (
                    <div className="table-container">
                        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">

                            <thead>
                                <tr>
                                    {Object.keys(props.excelData[0]).map((key) => (
                                        <th className="m-1" key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {props.excelData.map((individualExcelData, index) => (
                                    <tr key={index}>
                                        {Object.keys(individualExcelData).map((key) => (
                                            <td className="m-1" key={key}>{individualExcelData[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="m-2 section"></div>
                )}
            </div>
        </>
    );
}

export default SheetViewer;