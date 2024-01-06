
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination} from 'swiper';
import harrypotter from '../../../images/harrypotter.png'
import bp_disk from '../../../images/bp_disk.jpg'
import lotr from '../../../images/lotr.png'



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const sliderList = [
  {
  id:1,
  content :'Chào mừng tới với AIMS',
  secondaryContent :'Harry Potter',
  thirContent :'Best seller',
  discount :'Giảm tới 20%',
  buttonContent:'Register',
  image:harrypotter
  },

  {
  id:2,
  content :'Nổi bật',
  secondaryContent :'BlackPink The Album',
  thirContent :'Hay lắm',
  discount :'Giảm tới 20%',
  buttonContent:'Register',
  image:bp_disk
  },

  {
    id:3,
    content :'Phiêu lưu',
    secondaryContent :'Chúa tể những chiếc nhẫn',
    thirContent :'Tiểu thuyết kỳ ảo',
    discount :'Giảm tới 20%',
    buttonContent:'Register',
    image:lotr
  },
    
]


export default function Slider() {

  return (
    <Swiper
      modules={[Autoplay,Pagination]}
      spaceBetween={40}
      slidesPerView={1}
      loop={true}
      pagination={{clickable:true}}
      autoplay={{ delay: 2500}}

    >
        {
        sliderList.map((slider)=>(
          <SwiperSlide key ={slider.id}>   
          <>
          <div className="flex flex-col md:flex-row pt-32">
            <div  className="basis-3/4 rounded-lg flex items-center justify-center lg:ml-32">
                <div className="flex flex-col p-8 lg:p-32">
                  <h3 className="text-gray-600 p-2">{slider.content}</h3>
                  <h2 className="font-medium text-4xl p-2">{slider.secondaryContent}</h2>
                  <h2 className="font-bold text-4xl p-2">{slider.thirContent}</h2>
                  <h3 className="font-bold text-3xl text-green-600 p-4">{slider.discount}</h3>

                  {/* <button onClick={() => navigate("/Signup")}
                  className="mt-2 ml-2 whitespace-nowrap w-32 inline-flex items-center justify-center 
                  px-4 py-2 border border-transparent rounded-3xl shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600">
                      {slider.buttonContent}</button> */}
                </div>
            </div>

              <div className="basis-11/12 rounded-lg flex items-center justify-center ">
                <img src={slider.image}  className="w-5/6 lg:mr-32 mt-8"></img>
              </div>
          </div>
          </>
          </SwiperSlide>
        ))
      }
    
    </Swiper>
  );
};
