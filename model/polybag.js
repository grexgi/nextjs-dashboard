const supabase = require('../utils/supabase');

class Polybag {
    id;
    ulangan;
    bedengan;
    nutrisi;
    pembenah_tanah;

    // constructor({ id, ulangan, bedengan, nutrisi, pembenah_tanah }) {
    //     this.id = id;
    //     this.ulangan = ulangan;
    //     this.bedengan = bedengan;
    //     this.nutrisi = nutrisi;
    //     this.pembenah_tanah = pembenah_tanah;
    // }

    async getAllPolybag() {
        const { data, error } = await supabase
            .from('polybag')
            .select()
        // .like('id_polybag', cropCode);

        return data;
    }

    async getPolybag(id) {
        const { data, error } = await supabase
            .from('polybag')
            .select()
            .like('id_polybag', id);

        return data;
    }
}

const polybags = new Polybag();

polybags.getPolybag('B3-N2P3(1)').then((data) => {
    console.log(data); // data is an array of polybag objects
}).catch((error) => {
    console.error(error);
});