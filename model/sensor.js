const supabase = require('../utils/supabase');

class Sensor {
    async getAllSensor() {
        const { data, error } = await supabase
            .from('sensor')
            .select()
        // .like('id_polybag', cropCode);

        return data;
    }

    async getAllSoilSensor() {
        const { data, error } = await supabase
            .from('sensor')
            .select()
            .like('type', 'soil')
            .order('urutan');

        return data;
    }

    async getSensorById(id) {
        const { data, error } = await supabase
            .from('sensor')
            .select()
            .like('id', id);

        return data;
    }

    async getSensorByPolybag(polybag) {
        const { data, error } = await supabase
            .from('polybag')
            .select('id_polybag, sensor(id, channel_id, read_key)')
            .like('id_polybag', polybag);

        return data;
    }
}

module.exports = Sensor;

// const sensors = new Sensor();

// sensors.getAllSoilSensor().then((data) => {
//     console.log(data);
// }).catch((error) => {
//     console.error(error);
// });