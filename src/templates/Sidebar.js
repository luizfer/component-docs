/* @flow */

import React from 'react';
import Link from './Link';
import { css } from '../lib/styling';
import type { Metadata } from '../types/Metadata';

const sidebar = css`
  padding: 24px;
  background-color: #262939;
  display: none;

  @media(min-width: 640px) {
    display: block;
    height: 100%;
    width: 240px;
    overflow: auto;
  }
`;

const menuIcon = css`
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 24px;
  z-index: 10;

  @media(min-width: 640px) {
    display: none;
  }
`;

const menuButton = css`
  display: none;

  &:checked ~ nav {
    display: block;
  }

  &:checked ~ label {
    color: #fff;
    opacity: 0.64;
    user-select: none;
  }

  &:checked ~ label > span:first-of-type {
    display: none;
  }

  &:not(:checked) ~ label > span:last-of-type {
    display: none;
  }
`;

const separator = css`
  border: 0;
  background-color: #fff;
  height: 1px;
  margin: 8px 0;
  opacity: 0.04;
`;

const link = css`
  display: block;
  padding: 8px 0;
  text-decoration: none;
  font-weight: 600;
  color: #fff;
  opacity: 0.32;

  &:hover {
    color: #fff;
    opacity: 0.80;
  }
`;

const active = css`
  opacity: 0.80;
`;

type Props = {
  name: string,
  data: Array<Array<Metadata>>,
};

export default function Sidebar({ name, data }: Props) {
  const links = [];

  data.forEach((items, i) => {
    items.forEach(route =>
      links.push(
        <Link
          key={route.name}
          to={route.name}
          className={`${link} ${name === route.name ? active : ''}`}
        >
          {route.title}
        </Link>
      )
    );
    if (data[i + 1]) {
      links.push(<hr key={`separator-${i + 1}`} className={separator} />);
    }
  });

  return (
    <div>
      <input
        className={menuButton}
        id="slide-sidebar"
        type="checkbox"
        role="button"
      />
      <label className={menuIcon} htmlFor="slide-sidebar">
        <span>☰</span>
        <span>✕</span>
      </label>
      <nav className={sidebar}>
        {links}
      </nav>
    </div>
  );
}