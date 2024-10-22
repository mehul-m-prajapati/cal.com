import type { App_RoutingForms_Form } from "@prisma/client";
import type z from "zod";

import type { AttributeType } from "@calcom/prisma/client";
import type { RoutingFormSettings } from "@calcom/prisma/zod-utils";

import type QueryBuilderInitialConfig from "../components/react-awesome-query-builder/config/config";
import type { zodRouterRouteView, zodNonRouterRoute, zodFieldsView, zodRoutesView } from "../zod";

export type RoutingForm = SerializableForm<App_RoutingForms_Form>;

export type QueryBuilderUpdatedConfig = typeof QueryBuilderInitialConfig & { fields: Config["fields"] };

export type FormResponse = Record<
  // Field ID
  string,
  {
    value: number | string | string[];
    label: string;
  }
>;

export type Fields = z.infer<typeof zodFieldsView>;
export type Field = NonNullable<Fields>[number];
export type Routes = z.infer<typeof zodRoutesView>;
export type Route = NonNullable<Routes>[0];
export type NonRouterRoute = z.infer<typeof zodNonRouterRoute>;

export type SerializableFormTeamMembers = {
  userId: number;
  email: string;
  avatarUrl: string | null;
  name: string | null;
  defaultScheduleId: number | null;
  attributes: Record<
    string,
    {
      type: AttributeType;
      options: AttributeOption[];
      name: string;
      slug: string;
      id: string;
    }
  >;
}[];

export type SerializableForm<
  T extends Omit<App_RoutingForms_Form, "fields" | "routes" | "createdAt" | "updatedAt" | "settings">
> = T & {
  routes: Routes;
  fields: Fields;
  settings: z.infer<typeof RoutingFormSettings>;
  createdAt: string;
  updatedAt: string;
  connectedForms: { name: string; description: string | null; id: string }[];
  routers: { name: string; description: string | null; id: string }[];
  teamMembers: SerializableFormTeamMembers;
};

export type LocalRoute = z.infer<typeof zodNonRouterRoute>;
export type GlobalRoute = z.infer<typeof zodRouterRouteView>;

export type SerializableRoute =
  | (LocalRoute & {
      queryValue: LocalRoute["queryValue"];
      isFallback?: LocalRoute["isFallback"];
    })
  | GlobalRoute;

export type OrderedResponses = FormResponse[string][];

export type AttributeOption = {
  id: string;
  value: string;
  slug: string;
};

export type Attribute = {
  name: string;
  slug: string;
  type: AttributeType;
  id: string;
  options: AttributeOption[];
};

export type AttributesQueryValue = NonNullable<LocalRoute["attributesQueryValue"]>;
export type FormFieldsQueryValue = LocalRoute["queryValue"];
export type SerializableField = NonNullable<SerializableForm<App_RoutingForms_Form>["fields"]>[number];
