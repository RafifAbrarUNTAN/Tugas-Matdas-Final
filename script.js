
/* Fungsi untuk modal informasi pembuat */

// Credit Modal
// Fungsi untuk membuka modal credit (informasi pembuat)
function openCreditModal() {
    // Ambil elemen modal dan hapus class 'hidden' untuk menampilkannya
    document.getElementById('creditModal').classList.remove('hidden');
}

// Fungsi untuk menutup modal credit
function closeCreditModal() {
    // Tambahkan class 'hidden' untuk menyembunyikan modal
    document.getElementById('creditModal').classList.add('hidden');
}

// Close modal when clicking outside
// Event listener untuk menutup modal ketika user klik di luar area modal
window.onclick = function(event) {
    // Ambil elemen modal
    const modal = document.getElementById('creditModal');
    
    // Cek apakah yang diklik adalah overlay modal (bukan konten modal)
    if (event.target === modal) {
        // Tutup modal
        closeCreditModal();
    }
}
/* BINARY SEARCH Implementasi algoritma pencarian biner  */

// Binary Search
// Fungsi untuk melakukan binary search pada array terurut
function performBinarySearch() {
    // Ambil nilai input dari user
    const input = document.getElementById('binarySearchInput').value;
    
    // Convert string input ke integer
    const value = parseInt(input);
    
    // Array data yang sudah terurut untuk binary search
    const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    // Ambil elemen untuk menampilkan hasil dan langkah-langkah
    const resultDiv = document.getElementById('binarySearchResult');
    const stepsDiv = document.getElementById('binarySearchSteps');

    // Validasi input - cek apakah input adalah angka valid
    if (isNaN(value)) {
        // Tampilkan pesan error jika input tidak valid
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka yang valid!</p>';
        stepsDiv.innerHTML = '';
        return; // Keluar dari fungsi
    }

    // Inisialisasi variabel untuk binary search
    let left = 0; // Index paling kiri (awal array)
    let right = array.length - 1; // Index paling kanan (akhir array)
    const steps = []; // Array untuk menyimpan setiap langkah pencarian
    let found = false; // Flag untuk menandai apakah nilai ditemukan
    let position = -1; // Posisi/index dari nilai yang dicari (-1 = tidak ditemukan)

    // Binary Search Loop
    // Loop akan berjalan selama left <= right (masih ada elemen untuk dicek)
    while (left <= right) {
        // Hitung middle index dengan pembulatan ke bawah
        // Math.floor membulatkan hasil pembagian ke bawah
        const mid = Math.floor((left + right) / 2);
        
        // Simpan langkah ini untuk ditampilkan
        steps.push(`Langkah ${steps.length + 1}: left=${left}, right=${right}, mid=${mid}, array[${mid}]=${array[mid]}`);

        // Cek apakah elemen di tengah adalah nilai yang dicari
        if (array[mid] === value) {
            // Nilai ditemukan!
            found = true;
            position = mid;
            steps.push(`✅ Ditemukan! ${value} berada di indeks ${mid}`);
            break; // Keluar dari loop
        } 
        // Jika nilai di tengah lebih kecil dari yang dicari
        else if (array[mid] < value) {
            // Cari di bagian kanan (nilai lebih besar)
            left = mid + 1;
            steps.push(`   ${array[mid]} < ${value}, cari di bagian kanan`);
        } 
        // Jika nilai di tengah lebih besar dari yang dicari
        else {
            // Cari di bagian kiri (nilai lebih kecil)
            right = mid - 1;
            steps.push(`   ${array[mid]} > ${value}, cari di bagian kiri`);
        }
    }

    // Jika tidak ditemukan setelah loop selesai
    if (!found) {
        steps.push(`❌ ${value} tidak ditemukan dalam array`);
    }

    // Tampilkan hasil pencarian
    // Set class berdasarkan hasil (success/error)
    resultDiv.className = found ? 'result-box success' : 'result-box error';
    // Tampilkan pesan hasil
    resultDiv.innerHTML = `<p>${found ? '✅ Angka ' + value + ' ditemukan di indeks ' + position : '❌ Angka ' + value + ' tidak ditemukan'}</p>`;
    
    // Tampilkan semua langkah pencarian
    stepsDiv.innerHTML = '<p><strong>Langkah-langkah:</strong></p>' + 
        steps.map(step => `<p>${step}</p>`).join('');
}

/* FACTORIAL CALCULATION Implementasi fungsi factorial secara rekursif */

// Factorial Calculation
// Fungsi untuk menghitung factorial secara rekursif
function calculateFactorial() {
    // Ambil input dari user
    const input = document.getElementById('factorialInput').value;
    const value = parseInt(input);
    const resultDiv = document.getElementById('factorialResult');
    const stepsDiv = document.getElementById('factorialSteps');

    // Validasi input - cek apakah input adalah angka non-negatif
    if (isNaN(value) || value < 0) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka non-negatif!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    // Batasi input maksimal 10 untuk menghindari angka terlalu besar
    if (value > 10) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka maksimal 10!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    // Array untuk menyimpan langkah-langkah rekursi
    const steps = [];

    // Fungsi rekursif untuk menghitung factorial
    // Parameter depth untuk tracking level rekursi (untuk indentasi)
    function factorial(n, depth = 0) {
        // Buat indentasi berdasarkan kedalaman rekursi
        const indent = '  '.repeat(depth);

        // Base case: factorial(0) = 1 dan factorial(1) = 1
        if (n === 0 || n === 1) {
            steps.push(`${indent}factorial(${n}) = 1 (base case)`);
            return 1;
        } 
        // Recursive case: n! = n × (n-1)!
        else {
            // Catat pemanggilan fungsi
            steps.push(`${indent}factorial(${n}) = ${n} × factorial(${n - 1})`);
            
            // Panggil fungsi factorial secara rekursif dengan n-1
            // Tingkatkan depth untuk indentasi
            const res = n * factorial(n - 1, depth + 1);
            
            // Catat hasil perhitungan
            steps.push(`${indent}factorial(${n}) = ${n} × ${res / n} = ${res}`);
            
            return res;
        }
    }

    // Panggil fungsi factorial
    const factResult = factorial(value);
    
    // Tampilkan hasil
    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `<p>${value}! = ${factResult}</p>`;
    
    // Tampilkan semua langkah rekursi
    stepsDiv.innerHTML = '<p><strong>Proses Rekursif:</strong></p>' + 
        steps.map(step => `<p>${step}</p>`).join('');
}

/* untuk keyboard shortcuts */

// Keyboard shortcuts
// Event listener untuk menangani keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Enter key for inputs
    // Cek apakah tombol yang ditekan adalah Enter
    if (event.key === 'Enter') {
        // Ambil elemen yang sedang aktif/fokus
        const activeElement = document.activeElement;
        
        // Cek input mana yang sedang fokus dan panggil fungsi yang sesuai
        if (activeElement.id === 'binarySearchInput') {
            performBinarySearch();
        } else if (activeElement.id === 'bubbleSortInput') {
            performBubbleSort();
        } else if (activeElement.id === 'stackInput') {
            pushToStack();
        } else if (activeElement.id === 'factorialInput') {
            calculateFactorial();
        }
    }
    
    // ESC key to close modal
    // Cek apakah tombol yang ditekan adalah Escape
    if (event.key === 'Escape') {
        // Tutup modal jika ada yang terbuka
        closeCreditModal();
    }
});
