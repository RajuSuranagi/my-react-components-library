import React from 'react';

import cx from 'classnames';

import { Select, Form } from 'antd';
import ProForm from '@ant-design/pro-form';
import MaskedInput from 'antd-masked-input';

import { isRequired } from '@/helpers/form/rules';
import { isValidPhoneNumberOfSize } from './phoneNumber.helpers';
import { SORTED_COUNTRY_CODE_OPTIONS, getPhoneNumberError } from './phoneNumber.helpers.js';

import styles from './phoneNumber.less';

const CountryCode = ({ name, rules, onFocus, onBlur }) => {
  return (
    <Form.Item noStyle name={[name, 'countryCode']} rules={rules}>
      <Select
        showSearch
        tabIndex={-1}
        onBlur={onBlur}
        onFocus={onFocus}
        style={{ width: 100 }}
        notFoundContent="Not found"
        options={SORTED_COUNTRY_CODE_OPTIONS}
      />
    </Form.Item>
  );
};

const PhoneNumberField = (props) => {
  const { label, name, rules } = props;

  return (
    <ProForm.Item noStyle shouldUpdate rules={rules}>
      {(form) => {
        const hasError = getPhoneNumberError(form);

        const labelClassNames = cx('field-label', styles.fieldLabel, {
          [styles.errorLabel]: hasError,
        });
        const formFieldClassNames = cx('form-field', {
          'form-field-error': hasError,
        });

        return (
          <div className={formFieldClassNames}>
            <div className={labelClassNames}>
              {label}
              {<span className={styles.requiredIndicator}>*</span>}
            </div>
            <Form.Item
              noStyle
              name={[name, 'number']}
              rules={[isRequired, isValidPhoneNumberOfSize(10)]}
            >
              <MaskedInput
                size="large"
                allowClear
                addonBefore={<CountryCode name={name} rules={rules} />}
                mask="(111) 111—1111"
                className={styles.telephoneNumber}
              />
            </Form.Item>
          </div>
        );
      }}
    </ProForm.Item>
  );
};

export default PhoneNumberField;
