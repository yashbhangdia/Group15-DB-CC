import react, {useState} from 'react';
import StandardInput from './../forms/StandardInput/StandardInput';
import StandardButton from '../forms/StandardButton/StandardButton';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Search = (props) => {

    const [searchVal, setSearchValue] = useState(props.searchVal ? props.searchVal : "");

    const onSubmit = (search) => {
        props.handleSearch(search);   
    }

    return (
        <div id="app" className='mb-3' >
            <form >
                <Row>
                    <Col md={9}>
                    <StandardInput id={'searchInput'} value={searchVal} placeholder={'Search'} onChange={(e)=>{setSearchValue(e.target.value)}} />
                    </Col>
                    <Col md={2} style={{padding:'0px'}}>
                    <StandardButton onClick={()=>{ onSubmit(searchVal); }} text={'Search'} border={true} className='btn-md' style={{backgroundColor:"#0d21a1", color:"white"}}/>
                    </Col>
                </Row>
            </form>
        </div>
    );
}

export default Search;