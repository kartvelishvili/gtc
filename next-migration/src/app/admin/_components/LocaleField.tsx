"use client";

import { FC, useState } from "react";

interface Props {
  label: string;
  name: string;
  defaultValue?: { en: string; ge: string; ru: string };
  textarea?: boolean;
}

const LocaleField: FC<Props> = ({ label, name, defaultValue, textarea }) => {
  const [value, setValue] = useState(
    defaultValue || { en: "", ge: "", ru: "" }
  );

  const Tag = textarea ? "textarea" : "input";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input type="hidden" name={name} value={JSON.stringify(value)} />
      <div className="grid grid-cols-3 gap-2">
        {(["en", "ge", "ru"] as const).map((lang) => (
          <div key={lang}>
            <span className="text-xs text-gray-400 uppercase">{lang}</span>
            <Tag
              value={value[lang]}
              onChange={(e) =>
                setValue((prev) => ({ ...prev, [lang]: e.target.value }))
              }
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={textarea ? 3 : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocaleField;
