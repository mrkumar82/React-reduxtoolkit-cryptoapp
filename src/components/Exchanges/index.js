import React from "react";
import { useGetCryptosExchangeQuery } from "../../services/cryptoApi";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Row, Col, Collapse, Typography, Avatar } from "antd";
import Loader from "../Loader";
const { Text } = Typography;
const { Panel } = Collapse;
const Exchanges = () => {
  const { data, isFetching } = useGetCryptosExchangeQuery();
  const exchangesList = data?.data?.exchanges;
  console.log(exchangesList);
  if (isFetching) return <Loader />;

  return (
    <div>
      <h2>Exchanges</h2>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
