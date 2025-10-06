// Global Variables
let stack = [];

// Section Navigation
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.home-section, .content-section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show selected section
    if (sectionName === 'home') {
        document.getElementById('homeSection').classList.remove('hidden');
    } else {
        document.getElementById(sectionName + 'Section').classList.remove('hidden');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Credit Modal
function openCreditModal() {
    document.getElementById('creditModal').classList.remove('hidden');
}

function closeCreditModal() {
    document.getElementById('creditModal').classList.add('hidden');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('creditModal');
    if (event.target === modal) {
        closeCreditModal();
    }
}

// Program Navigation
function showProgram(programName) {
    // Hide all programs
    const programs = document.querySelectorAll('.program-demo');
    programs.forEach(program => program.classList.add('hidden'));

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show selected program
    const programId = programName.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) + 'Demo';
    document.getElementById(programId).classList.remove('hidden');

    // Set active tab
    event.target.classList.add('active');
}

// Binary Search
function performBinarySearch() {
    const input = document.getElementById('binarySearchInput').value;
    const value = parseInt(input);
    const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    const resultDiv = document.getElementById('binarySearchResult');
    const stepsDiv = document.getElementById('binarySearchSteps');

    if (isNaN(value)) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka yang valid!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    let left = 0;
    let right = array.length - 1;
    const steps = [];
    let found = false;
    let position = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        steps.push(`Langkah ${steps.length + 1}: left=${left}, right=${right}, mid=${mid}, array[${mid}]=${array[mid]}`);

        if (array[mid] === value) {
            found = true;
            position = mid;
            steps.push(`✅ Ditemukan! ${value} berada di indeks ${mid}`);
            break;
        } else if (array[mid] < value) {
            left = mid + 1;
            steps.push(`   ${array[mid]} < ${value}, cari di bagian kanan`);
        } else {
            right = mid - 1;
            steps.push(`   ${array[mid]} > ${value}, cari di bagian kiri`);
        }
    }

    if (!found) {
        steps.push(`❌ ${value} tidak ditemukan dalam array`);
    }

    resultDiv.className = found ? 'result-box success' : 'result-box error';
    resultDiv.innerHTML = `<p>${found ? '✅ Angka ' + value + ' ditemukan di indeks ' + position : '❌ Angka ' + value + ' tidak ditemukan'}</p>`;
    
    stepsDiv.innerHTML = '<p><strong>Langkah-langkah:</strong></p>' + 
        steps.map(step => `<p>${step}</p>`).join('');
}

// Bubble Sort
function performBubbleSort() {
    const input = document.getElementById('bubbleSortInput').value;
    const resultDiv = document.getElementById('bubbleSortResult');
    const stepsDiv = document.getElementById('bubbleSortSteps');

    if (!input.trim()) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka yang dipisah koma!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    const array = input.split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

    if (array.length === 0) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Format input tidak valid!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    const steps = [`Array awal: [${array.join(', ')}]`];
    const originalArray = [...array];

    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false;
        steps.push(`\nIterasi ${i + 1}:`);

        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
                steps.push(`  Tukar ${array[j + 1]} dan ${array[j]} → [${array.join(', ')}]`);
            }
        }

        if (!swapped) {
            steps.push(`  Tidak ada pertukaran, array sudah terurut`);
            break;
        }
    }

    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `<p><strong>Hasil:</strong></p><p>[${originalArray.join(', ')}] → [${array.join(', ')}]</p>`;
    
    stepsDiv.innerHTML = '<p><strong>Proses Sorting:</strong></p>' + 
        steps.map(step => `<p>${step}</p>`).join('');
}

// Stack Operations
function pushToStack() {
    const input = document.getElementById('stackInput');
    const value = input.value.trim();
    const infoDiv = document.getElementById('stackInfo');

    if (!value) {
        infoDiv.className = 'result-box error';
        infoDiv.innerHTML = '<p>❌ Masukkan elemen untuk di-push!</p>';
        return;
    }

    stack.push(value);
    input.value = '';
    
    infoDiv.className = 'result-box success';
    infoDiv.innerHTML = `<p>✅ "${value}" berhasil di-push ke stack\nUkuran stack: ${stack.length}</p>`;
    
    updateStackDisplay();
}

function popFromStack() {
    const infoDiv = document.getElementById('stackInfo');

    if (stack.length === 0) {
        infoDiv.className = 'result-box error';
        infoDiv.innerHTML = '<p>❌ Stack kosong, tidak ada elemen untuk di-pop!</p>';
        return;
    }

    const poppedValue = stack.pop();
    
    infoDiv.className = 'result-box success';
    infoDiv.innerHTML = `<p>✅ "${poppedValue}" berhasil di-pop dari stack\nUkuran stack: ${stack.length}</p>`;
    
    updateStackDisplay();
}

function clearStack() {
    stack = [];
    const infoDiv = document.getElementById('stackInfo');
    
    infoDiv.className = 'result-box success';
    infoDiv.innerHTML = '<p>✅ Stack berhasil dikosongkan</p>';
    
    updateStackDisplay();
}

function updateStackDisplay() {
    const display = document.getElementById('stackDisplay');
    
    if (stack.length === 0) {
        display.innerHTML = '<p class="empty-message">Stack kosong</p>';
    } else {
        const stackHTML = [...stack].reverse().map((item, index) => 
            `<div class="stack-item">${item} ${index === 0 ? '← TOP' : ''}</div>`
        ).join('');
        display.innerHTML = stackHTML;
    }
}

// Factorial Calculation
function calculateFactorial() {
    const input = document.getElementById('factorialInput').value;
    const value = parseInt(input);
    const resultDiv = document.getElementById('factorialResult');
    const stepsDiv = document.getElementById('factorialSteps');

    if (isNaN(value) || value < 0) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka non-negatif!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    if (value > 10) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = '<p>❌ Masukkan angka maksimal 10!</p>';
        stepsDiv.innerHTML = '';
        return;
    }

    const steps = [];

    function factorial(n, depth = 0) {
        const indent = '  '.repeat(depth);

        if (n === 0 || n === 1) {
            steps.push(`${indent}factorial(${n}) = 1 (base case)`);
            return 1;
        } else {
            steps.push(`${indent}factorial(${n}) = ${n} × factorial(${n - 1})`);
            const res = n * factorial(n - 1, depth + 1);
            steps.push(`${indent}factorial(${n}) = ${n} × ${res / n} = ${res}`);
            return res;
        }
    }

    const factResult = factorial(value);
    
    resultDiv.className = 'result-box success';
    resultDiv.innerHTML = `<p>${value}! = ${factResult}</p>`;
    
    stepsDiv.innerHTML = '<p><strong>Proses Rekursif:</strong></p>' + 
        steps.map(step => `<p>${step}</p>`).join('');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Enter key for inputs
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        
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
    if (event.key === 'Escape') {
        closeCreditModal();
    }
});