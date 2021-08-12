import { ReviewType } from "@/shared/type";
import React from "react";
import styled from "styled-components";
import ReviewList from "./ReviewList";
import { reviews } from "@/shared/dummy";

const ReviewSection = () => (
  <SectionWrapper>
    <div className="title">유저들의 상품 후기</div>
    <ReviewList reviews={reviews.reviews}></ReviewList>
  </SectionWrapper>
);

const SectionWrapper = styled.div``;

export default ReviewSection;
