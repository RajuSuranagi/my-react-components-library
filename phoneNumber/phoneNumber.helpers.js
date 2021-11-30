import React from 'react';

import _map from 'lodash/map';
import _size from 'lodash/size';
import _sortBy from 'lodash/sortBy';
import _toUpperCase from 'lodash/upperCase';
import InputMask from 'antd-masked-input/build/main/lib/inputmask-core';
import { allCountries, iso2Lookup } from 'country-telephone-data';
import getCountryFlag from 'country-flag-icons/modules/unicode';

const getLabel = (country) => {
  const { dialCode, iso2 } = country;

  return (
    <div className="flex">
      <span style={{ fontSize: 20, marginRight: '0.5rem' }}>
        {getCountryFlag(_toUpperCase(iso2))}
      </span>
      <span>+{dialCode}</span>
    </div>
  );
};

const getCountryOption = (country) => ({
  id: country.iso2,
  value: country.dialCode,
  label: getLabel(country),
  additional: {
    ...country,
    dialCode: Number.parseInt(country.dialCode, 10),
  },
});

// const COUNTRY_CODE_OPTIONS = _map(allCountries, getCountryOption);
const COUNTRY_CODE_OPTIONS = _map([allCountries[iso2Lookup.us]], getCountryOption);

export const SORTED_COUNTRY_CODE_OPTIONS = _sortBy(COUNTRY_CODE_OPTIONS, 'additional.dialCode');

export const getPhoneNumberError = (form) => {
  const phoneNumberError = form.getFieldError(['phone', 'number']);
  const phoneCountryCodeError = form.getFieldError(['phone', 'countryCode']);

  return _size(phoneNumberError) || _size(phoneCountryCodeError);
};

const phoneNumberValidator = (getFieldValue, requiredLen) => () => {
  const phoneNumber = getFieldValue(['phone', 'number']);
  const mask = new InputMask({
    pattern: '(111) 111—1111',
    value: phoneNumber,
  });
  const rawValue = mask.getRawValue();
  const [formattedValue] = rawValue.match(/\d+/g) || [''];

  if (formattedValue.length === requiredLen) {
    return Promise.resolve();
  }

  return Promise.reject(new Error(`Number size not equal to ${requiredLen}`));
};

export const isValidPhoneNumberOfSize = (requiredLen) => ({ getFieldValue }) => ({
  validator: phoneNumberValidator(getFieldValue, requiredLen),
  message: `Should be of ${requiredLen} numbers`,
});
