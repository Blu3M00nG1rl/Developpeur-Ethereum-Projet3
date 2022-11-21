import { Row } from 'reactstrap';

function NoticeWrongNetwork() {
  return (
    <section className="section">
      <Row>
        <h1 className="text-center">
          Metamask n'est pas connecté sur le bon réseau.
        </h1>
      </Row>
    </section>
  );
}

export default NoticeWrongNetwork;
