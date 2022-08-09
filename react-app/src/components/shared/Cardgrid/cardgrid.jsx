import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './cardgrid.scss'

function CardGrid(props) {
  return (
    <Row xs={1} md={3} className="g-4">
      {props.cardgrid.map((card, idx) => (
        <Col>
          <Card
            bg={"light"}
            key={card.id}
            text={"light" === 'light' ? 'dark' : 'white'}
            style={{ width: '20rem', height:"15rem" }}
            className="mb-2"
            >
            <Card.Header style={{textTransform:'capitalize'}}>{card.type}</Card.Header>
            <Card.Body>
                <Card.Title>ISIN : {card.inis}</Card.Title>
                <Card.Subtitle className='text-muted'>{card.status}</Card.Subtitle>
                <Card.Text className='pt-3' >
                    <ul  >
                        <li><b>Maturity Date </b>: {card.maturityDate.split('T')[0]}</li>
                        <li><b>Face Value </b>: {card.faceValue}</li>
                        <li><b>Coupon </b>: {card.coupon}</li>
                        <li><b>Issuer </b>: {card.issuer}</li>
                    </ul>
                </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardGrid;