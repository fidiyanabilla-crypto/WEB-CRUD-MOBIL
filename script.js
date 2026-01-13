// Ambil elemen DOM
const form = document.getElementById('carForm');
const carList = document.getElementById('carList');
const carIdInput = document.getElementById('carId');
const submitBtn = document.getElementById('submitBtn');

// Muat data dari localStorage
let cars = JSON.parse(localStorage.getItem('cars')) || [];
let editMode = false;

// Render daftar mobil ke tabel
function renderCars() {
  carList.innerHTML = '';
  cars.forEach((car, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${car.merek}</td>
      <td>${car.model}</td>
      <td>${car.tahun}</td>
      <td>${car.warna}</td>
      <td>Rp ${parseInt(car.harga).toLocaleString('id-ID')}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editCar(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteCar(${index})">Hapus</button>
      </td>
    `;
    carList.appendChild(row);
  });
}

// Simpan ke localStorage
function saveToLocalStorage() {
  localStorage.setItem('cars', JSON.stringify(cars));
}

// Submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const merek = document.getElementById('merek').value.trim();
  const model = document.getElementById('model').value.trim();
  const tahun = document.getElementById('tahun').value;
  const warna = document.getElementById('warna').value.trim();
  const harga = document.getElementById('harga').value;

  if (editMode) {
    const id = parseInt(carIdInput.value);
    cars[id] = { merek, model, tahun, warna, harga };
    editMode = false;
    submitBtn.textContent = 'Simpan';
  } else {
    cars.push({ merek, model, tahun, warna, harga });
  }

  saveToLocalStorage();
  renderCars();
  form.reset();
  carIdInput.value = '';
});

// Edit mobil
function editCar(index) {
  const car = cars[index];
  document.getElementById('merek').value = car.merek;
  document.getElementById('model').value = car.model;
  document.getElementById('tahun').value = car.tahun;
  document.getElementById('warna').value = car.warna;
  document.getElementById('harga').value = car.harga;
  carIdInput.value = index;
  submitBtn.textContent = 'Perbarui';
  editMode = true;
}

// Hapus mobil
function deleteCar(index) {
  if (confirm('Yakin ingin menghapus mobil ini?')) {
    cars.splice(index, 1);
    saveToLocalStorage();
    renderCars();
  }
}

// Ekspor fungsi global
window.editCar = editCar;
window.deleteCar = deleteCar;

// Inisialisasi awal
renderCars();