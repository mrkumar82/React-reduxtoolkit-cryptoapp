import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../../services/cryptoApi";
import Loader from "../Loader";
const Crypto = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <input
            type="text"
            placeholder="Search crypto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[20, 20]} className="crypto-card-container">
        {cryptos &&
          cryptos.map((crypto) => (
            <Col key={crypto.id} xs={24} sm={12} lg={6} className="crypto-card">
              <Link to={`/crypto/${crypto.id}`}>
                <Card
                  title={`${crypto.rank}, ${crypto.name} `}
                  extra={
                    <img
                      className="crypto-image"
                      alt={crypto.name}
                      src={crypto.iconUrl}
                    />
                  }
                  hoverable
                >
                  <p>Price : {millify(crypto.price)}</p>
                  <p>Market Cap : {millify(crypto.marketCap)}</p>
                  <p>Daily Change : {millify(crypto.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Crypto;
