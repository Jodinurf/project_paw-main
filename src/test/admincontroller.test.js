const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const AdminController = require('../app/controller/admincontroller');

const app = express();
app.use(bodyParser.json());
app.put('/product/:id', AdminController.updateProduct);

describe('AdminController.updateProduct', () => {
    it('should update a product successfully', async () => {
        const response = await request(app)
            .put('/product/20')
            .send({ namaProduk: 'Product', kategori: 'New Category', harga: 1000 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Berhasil mengubah product');
    });

    it('should return 404 if product not found', async () => {
        const response = await request(app)
            .put('/product/999')
            .send({ namaProduk: 'New Product', kategori: 'New Category', harga: 1000 });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Data product dengan ID 999 tidak ditemukan');
    });

    it('should return 500 if there is a server error', async () => {
        const response = await request(app)
            .put('/product/20')
            .send({ namaProdu: 'New Product', kategori: 'New Category', harga: "1000" });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Kegagalan mengubah product');
    });
});