// components/StarRating.js

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Você pode usar qualquer conjunto de ícones que preferir

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#f8c102" />);
    }

    if (halfStars > 0) {
      stars.push(<Ionicons key={'half'} name="star-half" size={16} color="#f8c102" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#f8c102" />);
    }

    return stars;
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {renderStars()}
      <Text style={{ marginLeft: 5 }}>{rating}</Text>
    </View>
  );
};

export default StarRating;
