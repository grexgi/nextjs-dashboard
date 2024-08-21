import supabase from "@/utils/supabase";

export default async function QuickInfo(cropCode) {
  const { data, error } = await supabase.from("polybag")
    .select('id_polybag, nutrisi, pembenah_tanah, ndvi_monitor(label), disease_monitor(label)')
    .like('id_polybag', cropCode.cropCode);

  // console.log(cropCode.cropCode);
  // console.log(data)
  // console.log(data[0].ndvi_monitor[data[0].ndvi_monitor.length-1]);
  // console.log(data[0].disease_monitor[data[0].disease_monitor.length-1]);

  return (
    <div className=' grid grid-cols-3 my-5 mx-3 gap-2 text-xs md:text-base'>
      <p className='font-semibold p-2'>Nutrisi</p>
      <p className='p-2'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit md:p-2 rounded-full'>{ data[0].nutrisi }</p>
      <p className='font-semibold p-2'>Pembenah Tanah</p>
      <p className='p-2'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{ data[0].pembenah_tanah }</p>
      <p className='font-semibold p-2'>Tingkat Kesehatan</p>
      <p className='p-2'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{ data[0].ndvi_monitor[data[0].ndvi_monitor.length-1].label }</p>
      <p className='font-semibold p-2'>Penyakit</p>
      <p className='p-2'>:</p>
      <p className='md:border md:border-green-600 text-green-600 font-semibold max-w-fit p-2 rounded-full'>{ data[0].disease_monitor[data[0].disease_monitor.length-1].label }</p>
    </div>
  );
}
