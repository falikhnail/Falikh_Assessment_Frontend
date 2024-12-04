import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
})
export class DataComponent implements OnInit {
  data: any[] = []; // Array untuk menyimpan data dari API

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData(); // Fetch data ketika komponen diinisialisasi
  }

  // Mengambil data dari API
  getData() {
    this.http
      .get('https://dev.patriotmed.id/BannerAds/Package/List')
      .subscribe((res: any) => {
        this.data = res.data;
      });
  }

  // Menghapus data berdasarkan ID
  delete(id: number) {
    this.http
      .delete(`https://dev.patriotmed.id/BannerAds/Package/Delete/${id}`)
      .subscribe(() => {
        this.data = this.data.filter((item) => item.id !== id); // Update array data setelah menghapus
      });
  }

  // Mengurutkan data berdasarkan harga (ascending/descending)
  sortPrice(order: 'asc' | 'desc') {
    this.data.sort((a, b) =>
      order === 'asc'
        ? a.package_price - b.package_price
        : b.package_price - a.package_price
    );
  }

  // Mendownload data dalam format PDF
  downloadPdf() {
    const doc = new jsPDF();
    doc.text('Data Packages', 10, 10);
    doc.autoTable({
      head: [['Package Name', 'Price']], // Header tabel
      body: this.data.map((item) => [item.package_name, item.package_price]), // Isi tabel
    });
    doc.save('data-packages.pdf'); // Simpan file PDF
  }
}
