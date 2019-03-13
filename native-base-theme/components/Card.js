import variable from './../variables/platform';

export default (variables = variable) => {
  const cardTheme = {
    '.transparent': {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null,
    },
    marginVertical: 5,
    marginHorizontal: 2,
    flex: 1,
    borderWidth: 0,
    borderRadius: 8,
    borderColor: '#868DB2',
    flexWrap: 'nowrap',
    backgroundColor: '#868DB2',
    shadowColor: '#868DB2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
  };

  return cardTheme;
};
