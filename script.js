// ===== FUNGSI BANTUAN =====
function hideMessage(el, time) {
    setTimeout(function() { 
        el.style.display = 'none'; 
    }, time);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showMainPage(initial, name) {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('userAvatar').textContent = initial;
    document.getElementById('userName').textContent = name;
}

// ===== FUNGSI LOGIN DENGAN EMAIL — AKUN BEBAS =====
function loginWithEmail() {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;
    var errorMsg = document.getElementById('errorMsg');
    var successMsg = document.getElementById('successMsg');

    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    // Cek kolom tidak boleh kosong
    if (email === '' || password === '') {
        errorMsg.textContent = '⚠️ Silakan isi email dan password!';
        errorMsg.style.display = 'block';
        hideMessage(errorMsg, 3000);
        return;
    }

    // Cek format email
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        errorMsg.textContent = '⚠️ Masukkan email yang valid (ada @ dan titik)!';
        errorMsg.style.display = 'block';
        hideMessage(errorMsg, 3000);
        return;
    }

    // Cek panjang password
    if (password.length < 4) {
        errorMsg.textContent = '⚠️ Password minimal 4 karakter bebas!';
        errorMsg.style.display = 'block';
        hideMessage(errorMsg, 3000);
        return;
    }

    // ==== BEBAS LOGIN ====
    // Tidak ada akun khusus. Semua email & password yang memenuhi syarat bisa masuk!
    successMsg.textContent = '✅ Berhasil masuk! Selamat datang 👋';
    successMsg.style.display = 'block';

    setTimeout(function() {
        var nameFromEmail = email.split('@')[0];
        nameFromEmail = capitalizeFirstLetter(nameFromEmail);
        showMainPage(email.charAt(0).toUpperCase(), nameFromEmail);
    }, 800);
}

// ===== FUNGSI LOGIN DENGAN GOOGLE =====
function loginWithGoogle() {
    var successMsg = document.getElementById('successMsg');
    successMsg.textContent = 'Membuka login Google...';
    successMsg.style.display = 'block';

    setTimeout(function() {
        successMsg.textContent = '✅ Berhasil masuk dengan Google! Selamat datang 👋';
    }, 1000);

    setTimeout(function() {
        showMainPage('U', 'Pengguna Google');
    }, 2000);
}

// ===== FUNGSI LOGOUT =====
function logout() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMsg').style.display = 'none';
    document.getElementById('successMsg').style.display = 'none';
}

// ===== FUNGSI TAMBAH KENDARAAN =====
function tambahKendaraanMasuk() {
    var plat = document.getElementById('platNomor').value.trim();
    var jenis = document.getElementById('jenisKendaraan').value;

    if (plat === '') {
        alert('⚠️ Silakan isi plat nomor kendaraan!');
        return;
    }

    var kodeTiket = 'PKR-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    var sekarang = new Date();
    var tanggal = sekarang.toLocaleDateString('id-ID');
    var jam = sekarang.toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
    var waktuMasuk = tanggal + ', ' + jam;

    var tabel = document.getElementById('tabelKendaraan');
    var barisBaru = document.createElement('tr');
    
    barisBaru.innerHTML = 
        '<td>' + kodeTiket + '</td>' +
        '<td><strong>' + plat.toUpperCase() + '</strong></td>' +
        '<td>' + jenis + '</td>' +
        '<td>' + waktuMasuk + '</td>' +
        '<td>0j 0m (Rp 0)</td>' +
        '<td>' +
            '<button class="btn-keluar" onclick="kendaraanKeluar(this)">Keluar</button> ' +
            '<button class="btn-tiket">Tiket</button>' +
        '</td>';
    
    tabel.insertBefore(barisBaru, tabel.firstChild);

    var jumlahElement = document.getElementById('jmlParkir');
    jumlahElement.textContent = parseInt(jumlahElement.textContent) + 1;

    var slotElement = document.getElementById('slotTersedia');
    slotElement.textContent = parseInt(slotElement.textContent) - 1;

    document.getElementById('platNomor').value = '';
    document.getElementById('catatan').value = '';

    alert('✅ Kendaraan berhasil terdaftar!\nNomor Tiket: ' + kodeTiket);
}

// ===== FUNGSI KENDARAAN KELUAR =====
function kendaraanKeluar(btn) {
    var baris = btn.parentElement.parentElement;
    var plat = baris.querySelector('td:nth-child(2) strong').textContent;
    
    if (confirm('Yakin kendaraan ' + plat + ' akan keluar?')) {
        var jumlahElement = document.getElementById('jmlParkir');
        jumlahElement.textContent = parseInt(jumlahElement.textContent) - 1;

        var slotElement = document.getElementById('slotTersedia');
        slotElement.textContent = parseInt(slotElement.textContent) + 1;

        var totalKeluarElement = document.getElementById('jmlKeluar');
        totalKeluarElement.textContent = parseInt(totalKeluarElement.textContent) + 1;

        baris.remove();
    }
}

// ===== FUNGSI CARI KENDARAAN =====
function cariKendaraan() {
    var input = document.getElementById('cariPlat').value.toUpperCase();
    var tabel = document.getElementById('tabelKendaraan');
    var baris = tabel.getElementsByTagName('tr');

    for (var i = 0; i < baris.length; i++) {
        var teks = baris[i].textContent || baris[i].innerText;
        baris[i].style.display = teks.toUpperCase().indexOf(input) > -1 ? '' : 'none';
    }
}

// ===== UPDATE WAKTU =====
function updateDateTime() {
    var now = new Date();
    var options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    var el = document.getElementById('dateTimeInfo');
    if (el) el.textContent = now.toLocaleDateString('id-ID', options);
}
setInterval(updateDateTime, 60000);
updateDateTime();

// ===== TEKAN ENTER UNTUK LOGIN =====
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        var loginPage = document.getElementById('loginPage');
        if (loginPage.style.display !== 'none') {
            loginWithEmail();
        }
    }
});
