export type GraphQLNetworkError = {
  type: "network-error";
  message: string;
};

export type GraphQLOperationError = {
  type: "operation-error";
  messages: string[];
};

export type GraphQLError = GraphQLNetworkError | GraphQLOperationError;
