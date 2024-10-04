import { onBeforeUnmount, reactive, ref, toRaw, watch } from "vue";

const interval = 3000;

interface IToastMessage {
  type: "success" | "info" | "warning" | "error";
  message: string;
}

type IToastMessages = Record<string, IToastMessage>;

const messages = ref<IToastMessages>({});
const timeouts = ref<ReturnType<typeof setTimeout>[]>([]);

export const useToast = () => {
  const destroyMessage = (key: string) => {
    const newObj = { ...messages.value };
    delete newObj[key];
    messages.value = newObj;
  };

  const fire = (message: IToastMessage) => {
    const key = Date.now().toString();
    const newObject = { ...messages.value, [key]: message };
    messages.value = newObject;

    const timeout = setTimeout(() => {
      destroyMessage(key);
    }, interval);
    timeouts.value.push(timeout);
  };

  return { fire, messages, timeouts };
};
