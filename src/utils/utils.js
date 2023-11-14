import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const returnMoment = (num, date) => {
    //num 0: 오늘, num -1: 어제 , date->new Date() 인자로 받음
    try {
        var today = new Date()
        if (num) {
            let new_date = new Date(today.setDate(today.getDate() + num))
            today = new_date
        }
        if (date) {
            today = date
        }
        var year = today.getFullYear()
        var month = ('0' + (today.getMonth() + 1)).slice(-2)
        var day = ('0' + today.getDate()).slice(-2)
        var dateString = year + '-' + month + '-' + day
        var hours = ('0' + today.getHours()).slice(-2)
        var minutes = ('0' + today.getMinutes()).slice(-2)
        var seconds = ('0' + today.getSeconds()).slice(-2)
        var timeString = hours + ':' + minutes + ':' + seconds
        let moment = dateString + ' ' + timeString
        return moment
    } catch (err) {
        console.log(err)
        return false
    }
}
export const excelDownload = async (excelData, column_list) => {
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = `${returnMoment().substring(0, 10).replaceAll('-', '')}-검사결과보고서`;

    let name_list = column_list.map(item => { return item?.label });
    const ws = XLSX.utils.aoa_to_sheet([
        name_list
    ]);

    let result = [...excelData];
    let excel_list = [];
    for (var i = 0; i < result.length; i++) {
        excel_list[i] = [];
        for (var j = 0; j < column_list.length; j++) {
            let data = result[i][column_list[j]?.column];
            if (column_list[j]?.column == 'idx') {
                data = i + 1;
            }
            await excel_list[i].push(data);
        }
    }
    await excel_list.map(async (data, idx) => {
        XLSX.utils.sheet_add_aoa(
            ws,
            [
                data
            ],
            { origin: -1 }
        );
        ws['!cols'] = [
            { wpx: 50 },
            { wpx: 50 }
        ]

        return false;
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
}