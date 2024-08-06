import supabase from "@/utils/supabase";

export default async function Polybags() {
    const { data, error } = await supabase.from("soil_sensor_monitoring")
        .select()
        .eq('polybag', 'B2-N2P1(3)')
        // .gte('created_at', '2024-08-07')
        .lte('created_at', '2024-08-07')
        .order('entry', { ascending: false })
        .limit(288);

    if (error) {
        console.error(error);
        return <div>Error fetching data</div>;
    }

    if (!data || data.length === 0) {
        return <div>No data found</div>;
    }

    console.log(data.length); // Optional chaining

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}