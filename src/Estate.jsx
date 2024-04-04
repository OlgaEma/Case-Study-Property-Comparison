import { useState,useEffect } from 'react';
import './Estate.scss';
import EstateIconA from '../public/svg/estate-icon-A.svg';
import EstateIconB from '../public/svg/estate-icon-B.svg';

export default function Estate(){

const [estates,setEstates] = useState([]);
const [selectedEstates, setSelectedEstates] = useState([]);




    const fetchEstateData = async () => {

        const response = await fetch('https://estate-comparison.codeboot.cz/list.php');
        const data = await response.json();
        setEstates(data);
        console.log(data);
    };

    useEffect(() => {
        fetchEstateData ();
    }, []);

    const handleClick = (estateData) => {
        setSelectedEstates(prevSelection => {
            if (prevSelection.length < 2) {
                
                return [...prevSelection, estateData];
            } else {
               
                return [prevSelection[1], estateData];
            }
        });
        setHighlightedEstateId(estateData.id);
    };

   

    






    

return (
    <>
        <div className='estate'>
    {estates.slice(0, 10).map((estate) => (
        <div
            className={`estate_container ${selectedEstates.find(e => e.id === estate.id) ? 'highlighted' : ''}`}
            onClick={() => handleClick(estate)}
            key={estate.id}>
            <img className="estate_container_img" src={estate.images[0]} alt={estate.name_extracted} />
            <p className='estate_container_p'>{estate.name_extracted}{' '}{estate.locality}</p>
            
            {selectedEstates.findIndex((e) => e.id === estate.id) === 0 && (
                <img src={EstateIconA} className="selection_svg" alt="A" />
            )}
            {selectedEstates.findIndex((e) => e.id === estate.id) === 1 && (
                <img src={EstateIconB} className="selection_svg" alt="B" />
            )}
        </div>
    ))}
</div>
        <div className='comparisonContainer'>
            {selectedEstates.map((estate, index) => {
                
                const estatePriceStyle = selectedEstates.length === 2 ? (
                    selectedEstates[0].prize_czk < selectedEstates[1].prize_czk ?
                    (index === 0 ? { backgroundColor: 'green' } : { backgroundColor: 'red' }) :
                    (index === 0 ? { backgroundColor: 'red' } : { backgroundColor: 'green' })
                ) : {};
                
                
                const floorAreaStyle = selectedEstates.length === 2 ? (
                    Number(selectedEstates[0].building_area) > Number(selectedEstates[1].building_area) ?
                    (index === 0 ? { backgroundColor: 'green' } : { backgroundColor: 'red' }) :
                    (index === 0 ? { backgroundColor: 'red' } : { backgroundColor: 'green' })
                ) : {};
                
                const lendAreaStyle = selectedEstates.length === 2 ? (
                    Number(selectedEstates[0].land_area) > Number(selectedEstates[1].land_area) ?
                    (index === 0 ? { backgroundColor: 'green '} : { backgroundColor: 'red'}) :
                    (index === 0 ? { backgroundColor: 'red'} : {backgroundColor: 'green'}) 
                ) : {};
               

                return (
                    <div className='selectedEstate_container' key={index}>
                        <img className='selectedEstate_img' src={estate.images[0]} alt={estate.name} />
                        <p className='selectedEstate_p_name'>{estate.name}</p>
                        <p className='selectedEstate_p' style={estatePriceStyle}>
                            <span className='selectedEstate_span'><b>Price</b></span>
                            <span className='selectedEstate_span'>{estate.prize_czk}</span>
                        </p>
                        <p className='selectedEstate_p'>
                            <span className='selectedEstate_span'><b>Locality </b></span>
                            <span className='selectedEstate_span'>{estate.locality}</span>
                        </p>
                        <p className='selectedEstate_p' style={floorAreaStyle}>
                            <span className='selectedEstate_span'><b>Floor Area </b></span>
                            <span className='selectedEstate_span'>{estate.building_area}</span>
                        </p>
                        <p className='selectedEstate_p' style={lendAreaStyle}>
                            <span className='selectedEstate_span'><b>Land Area </b></span>
                            <span className='selectedEstate_span'>{estate.land_area}</span>
                        </p>
                        <div className='comparisonContainer_logoContainer'>
                            <img className='selectedEstate_logo' src={estate.company_logo} alt="" />
                            <p>{estate.company_name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </>
);
}
