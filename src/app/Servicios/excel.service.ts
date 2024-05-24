import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const tipoExcel = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const extExcel = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportarExcel(json: any[], excelNombreArchivo: string): void {
    
    const hojaTrabajo: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const libroTrabajo: XLSX.WorkBook = {
      Sheets: { 'data': hojaTrabajo },
      SheetNames: ['data']   
    }
    const excelBuffer: any = XLSX.write(libroTrabajo, { bookType: 'xlsx', type: 'array' });
    this.guardarComoExcel(excelBuffer, excelNombreArchivo);
  }
  private guardarComoExcel(buffer: any, filename: string): void {
    const data: Blob = new Blob([buffer], { type: tipoExcel });
    FileSaver.saveAs(data, filename + '_export_' + new Date().getTime() + extExcel);
  }
}
