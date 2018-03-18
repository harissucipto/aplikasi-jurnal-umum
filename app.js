Vue.filter('keRupiah', function convertToRupiah(angka) {
  var rupiah = '';
  var angkarev = angka
    .toString()
    .split('')
    .reverse()
    .join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return (
    'Rp. ' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
});

new Vue({
  el: '#layout',
  data: {
    jurnal: [
      // {
      //   tanggal: '2-01-2017',
      //   debet: 'utang',
      //   kredit: 'kas',
      //   nominalDebet: 25000,
      //   nominalKredit: 35000,
      //   ref: ''
      // }
    ],
    // input data,
    newTanggal: '',
    newDebet: '',
    newKredit: '',
    newNominalDebet: 0,
    newNominalKredit: 0,
    newRef: ''
  },
  methods: {
    tambahData() {
      const DataBaru = {
        tanggal: this.newTanggal,
        debet: this.newDebet,
        kredit: this.newKredit,
        nominalDebet: Number(this.newNominalDebet),
        nominalKredit: Number(this.newNominalKredit),
        ref: this.ref
      };

      this.jurnal.push(DataBaru);

      // bersihkan
      this.newTanggal = '';
      this.newDebet = '';
      this.newKredit = '';
      this.newNominalDebet = '';
      this.newNominalKredit = '';
      this.newRef = '';
    },
    hapus(index) {
      this.jurnal.splice(index, 1);
    }
  },
  computed: {
    totalDebet() {
      return this.jurnal.reduce((accumluator, currentValue) => {
        return accumluator + currentValue.nominalDebet;
      }, 0);
    },
    totalKredit() {
      return this.jurnal.reduce((accumluator, currentValue) => {
        return accumluator + currentValue.nominalKredit;
      }, 0);
    }
  }
});
