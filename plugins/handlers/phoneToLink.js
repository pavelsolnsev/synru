export const phoneToLinkFunc = (phone, additionalNumber) => {
  const [phoneNum, addNum] = phone.split('доб. ');

  const phoneLink = phoneNum.replace(/[^+\d]/g, '');
  const addLink = additionalNumber ?? addNum;

  return `${phoneLink}${addLink ? ('p' + addLink) : ''}`;
};
