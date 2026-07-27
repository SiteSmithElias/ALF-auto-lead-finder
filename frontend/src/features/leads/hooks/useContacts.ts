import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getLeadContacts,
  createContact,
  deleteContact,
  updateContact,
} from "../../../api/contacts";
import type { Contact } from "../../../types/contact";

export function useContacts(
  leadId: number
) {
  return useQuery({
    queryKey: [
      "contacts",
      leadId,
    ],

    queryFn: () =>
      getLeadContacts(leadId),
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leadId,
      data,
    }: any) =>
      createContact(
        leadId,
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "contacts",
          variables.leadId,
        ],
      });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteContact(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "contacts",
        ],
      });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Contact>;
    }) =>
      updateContact(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "contacts",
        ],
      });
    },
  });
}