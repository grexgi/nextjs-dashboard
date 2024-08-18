import supabase from "@/utils/supabase";

export default async function Polybags() {
    // const { data, error } = await supabase.from("soil_sensor_monitoring")
    //     .select()
    //     .eq('polybag', 'B2-N2P1(3)')
    //     .gte('created_at', '2024-08-07')
    //     .lte('created_at', '2024-08-08')
    //     .order('entry', { ascending: false })
    // // .limit(288);

    const { data, error } = await supabase.from("polybag")
        .select('id_polybag, ndvi_monitor!inner(label), disease_monitor!inner(label)')
        .like('id_polybag', 'B2-N2P1(3)')
    // .order('entry', { ascending: false })
    // .limit(288);


    if (error) {
        console.error(error);
        return <div>Error fetching data</div>;
    }

    if (!data || data.length === 0) {
        return <div>No data found</div>;
    }

    console.log(data.length);
    console.log(data[0].disease_monitor.length);
    console.log(data[0].disease_monitor[data[0].disease_monitor.length - 1]);


    return <pre>{JSON.stringify(data[0].disease_monitor[data[0].disease_monitor.length - 1], null, 2)}</pre>;
}