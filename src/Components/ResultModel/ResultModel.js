import React from 'react';
import './ResultModel.css';
import Modal from '../UI/Modal';
import { Button, darken } from '@mui/material';

const PriceCard = (props) => {
  const formatPredictedPrice = (price) => {
    const integerPart = Math.floor(price);
    
    if (integerPart.toString().length === 2) {
      return `₹${price}L`;
    } else if (integerPart.toString().length > 2) {
      const formattedPrice = (price / 100).toFixed(2);
      return `₹${formattedPrice}Cr`;
    } else {
      return `₹${price}`;
    }
  };

  return (
    <Modal closeModal={() => props.onClick(false)}>
      <div className="price-card">
        <div className="price-card-header">
          <h2>Predicted Price</h2>
        </div>
        <div className="price-card-content">
          <p>The predicted price is:</p>
          <h3>{formatPredictedPrice(props.predictedPrice)}</h3>
        </div>
        <Button
          variant="contained"
          onClick={() => props.onClick(false)}
          sx={{ backgroundColor: props.primaryColor, color: 'white', mt: 2 , "&:hover": {
            backgroundColor: darken(props.primaryColor, 0.2),
          }, }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default PriceCard;
